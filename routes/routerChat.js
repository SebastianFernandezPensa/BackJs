import express from 'express';
import MessageModel from '../dao/models/messageModel.js';

const router = express.Router();
// Ruta GET para renderizar la vista chat.handlebars
router.get('/chat', async (req, res) => {
    try {
      // Obtén todos los mensajes de la colección
      const messages = await MessageModel.find().lean(); // Utiliza el método lean() para obtener objetos JSON planos
  
      // Modifica cada mensaje para que "timestamp" y "message" sean propiedades directas
      const modifiedMessages = messages.map((message) => ({
        timestamp: message.timestamp,
        message: message.message,
        user: message.user // Agrega la propiedad "user" al mensaje modificado
      }));
  
      // Renderiza la vista chat.handlebars y pasa los mensajes modificados como datos
      res.render('chat', { messages: modifiedMessages });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  
  

// Ruta POST para guardar un nuevo mensaje en la colección
router.post('/chat', async (req, res) => {
    try {
      const { user, message } = req.body;
      const newMessage = new MessageModel({ user, message });
      await newMessage.save();
  
      res.redirect('/chat');
    } catch (error) {
      console.log(error); 
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

export default router;

