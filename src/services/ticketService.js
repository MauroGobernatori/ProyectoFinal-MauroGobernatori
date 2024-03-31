import TicketDao from "../daos/ticketDao.js";
const ticketDao = new TicketDao();

import { v4 as uuidv4 } from 'uuid';

class TicketService {
    async generateTicket(userEmail, amount){
        try{
            const ticket = await ticketDao.createTicket({
                code: uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount: amount,
                purchaser: userEmail
            });
            if(ticket){
                return ticket
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }

    async getTicketById(tid){
        try{
            const ticket = await ticketDao.getTicketById(tid);
            if(ticket){
                return ticket
            }else{
                return false
            }
        }catch(error){
            throw new Error(error)
        }
    }
}

export const ticketService = new TicketService();