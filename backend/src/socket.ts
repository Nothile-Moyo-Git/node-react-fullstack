/**
 *
 * Date created : 29/06/2024
 *
 * Author : Nothile Moyo
 *
 * description : Our socket connection in a file which can be shared amongst multiple files
 */

import { Server } from "socket.io";
import { IncomingMessage, Server as HTTPServer, ServerResponse } from "http";

let io: Server;

export const init = (
  server: HTTPServer<typeof IncomingMessage, typeof ServerResponse>,
) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    console.error("Socket.io is not initialized!");
  } else {
    return io;
  }
};
