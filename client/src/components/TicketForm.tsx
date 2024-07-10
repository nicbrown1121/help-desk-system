import { ChangeEvent, useState } from "react"
import './styles.css'
import { TicketStatus } from "../util/TicketStatusEnum"
import config from '../config';

const initialTicketState = {
  name: '',
  email: '',
  description: '',
  status: TicketStatus.NEW,
}

export const TicketForm = () => {
  const [ticket, setTicket] = useState(initialTicketState)
  const [successMessage, showSuccessMessage] = useState(false)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
    const { name, value} = e.target;
    setTicket({
      ...ticket,
      [name]: value,
    })
  }

  const handleCancel = () => {
    setTicket(initialTicketState);
  }

  const submitTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!ticket.name || !ticket.email || !ticket.description) {
      alert("Please fill in all fields.");
      return;
    }

    // Send POST request to backend
    try {
      const response = await fetch(`${config.apiUrl}/ticket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
      });
      if (response.ok) {
        showSuccessMessage(true)
        setTicket(initialTicketState);
      } 
    } catch (error) {
      console.log('Error creating ticket: ', error);
      throw error;
    }
    // Set ticket state back to iniital value
    setTicket(initialTicketState)
  }
  return (
    <div className='ticketForm'>
      {successMessage ? (
        <div className='submitTicketMessage'> Your ticket has been submitted to the team.
        </div>
      ) : (
        <form className='formStyle'>
          <div className='formField'>
            <label className='labelStyle'> Name </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="name"
              value={ticket.name}
              onChange={handleOnChange}
              className='inputStyle'
              required
            >
            </input>
          </div>        
          <div className='formField'>
            <label className='labelStyle'> email </label>
            <input
              type="email"
              placeholder="Enter Last Name"
              name="email"
              value={ticket.email}
              onChange={handleOnChange}
              className='inputStyle'
              required
            >
            </input>
          </div>
          <div className='formField'>
          <label className='labelStyle'> Description </label>
          <textarea
            placeholder="Describe the problem you are experiencing"
            name="description"
            value={ticket.description}
            onChange={handleOnChange}
            className='descriptionField'
            required
          >
          </textarea>
          <button type="submit" onClick={submitTicket} className='submitButton'>Submit Ticket</button>
          <button  onClick={handleCancel} className='cancelButton'>Cancel</button>
        </div>
      </form>
    )}
    </div>
  )
}
