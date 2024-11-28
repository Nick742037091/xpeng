import {
  ClientErrorStatusCode,
  ServerErrorStatusCode
} from 'hono/utils/http-status'

export const ClientCode = {
  Validate: 422 as ClientErrorStatusCode
}

export const ServerCode = {
  Common: 500 as ServerErrorStatusCode
}
