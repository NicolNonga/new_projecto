import { PrismaClient} from "@prisma/client";


  let database: PrismaClient

 
  declare global {
    var _database: PrismaClient | undefined
  }
  
  if(!global._database){
    global._database = new PrismaClient()
  }
  database =  global._database;

  export {database}