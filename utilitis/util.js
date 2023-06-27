import { v4 as uuidv4 } from 'uuid';

export function generateUserId(sessionId) {
  const uniqueId = uuidv4();
  const userId = `${sessionId}-${uniqueId}`;
  return userId;
}

// Otras funciones de utilidad...

export default generateUserId;

