import { ChangeEvent, useState } from "react"
import { TicketStatus } from "../utils/ticketStatusEnum";
import { validateTicket } from "../utils/validation";
import { createTicket } from "./service/ticketService";

const initialTicketState = {
  name: '',
  email: '',
  description: '',
  status: TicketStatus.NEW,
}

export const TicketForm = () => {
  const [ticket, setTicket] = useState(initialTicketState)
  const [successMessage, showSuccessMessage] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleOnChange = (e: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => {
    const { name, value} = e.target;

    setTicket({
      ...ticket,
      [name]: value,
    })
  }

  const handleCancel = () => {
    setTicket(initialTicketState);
    setErrors({});
  }

  const submitTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateTicket(ticket);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path && err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Send POST request to backend
    try {
      await createTicket(ticket);
      showSuccessMessage(true)
      setTicket(initialTicketState);
    } catch (error) {
      console.log('Error creating ticket: ', error);
      throw error;
    }
  }

  return (
    <div className="flex justify-center items-center">
    <div className="flex flex-col items-center text-center mt-20 p-5 border border-gray-300 rounded-xl shadow-lg bg-white w-72">
      {successMessage ? (
        <><div className="text-green-500 font-bold items-center"> Thank you! </div><div className="text-green-500 font-bold items-center"> Your ticket has been submitted to the team. </div></>
      ) : (
        <form className="flex flex-col items-center">
          <div className="mb-4 w-full font-bold text-lg text-black">Ticket Form</div>
          <div className="mb-4 w-full">
            <label className="block mb-2 font-bold text-black"> Name </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="name"
              value={ticket.name}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black dark:text-black bg-white dark:bg-gray-200"
              required
            >
            </input>
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>        
          <div className="mb-4 w-full">
            <label className="block mb-2 font-bold text-black"> Email </label>
            <input
              type="email"
              placeholder="Enter Last Name"
              name="email"
              value={ticket.email}
              onChange={handleOnChange}
              className="w-full p-2 border border-gray-300 rounded-md text-black dark:text-black bg-white dark:bg-gray-200"
              required
            >
            </input>
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
          <div className="mb-4 w-full">
          <label className="block mb-2 font-bold text-black"> Description </label>
          <textarea
            placeholder="Describe the problem you are experiencing"
            name="description"
            value={ticket.description}
            onChange={handleOnChange}
            className="w-full h-24 p-2 border border-gray-300 rounded-md text-black dark:text-black bg-white dark:bg-gray-200"
            required
          >
          </textarea>
          {errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}
          <div className="flex space-x-4 p-4">
            <button onClick={handleCancel} className="py-2 px-4 rounded-md border-none bg-red-600 text-white font-bold cursor-pointer">Clear</button>
            <button type="submit" onClick={submitTicket} className="py-2 px-4 rounded-md border-none bg-blue-500 text-white font-bold cursor-pointer">Submit</button>
          </div>
        </div>
      </form>
    )}
    </div>
    </div>
  )
}
