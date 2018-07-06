export class User implements IUser {
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  uuid: string
  constructor(data: IUser) {
    if (data.username) {
      this.username = data.username
    }
    if (data.email) {
      this.email = data.email
    }
    if (data.password) {
      this.password = data.password
    }
    if (data.uuid) {
      this.uuid = data.uuid
    }
    if (data.firstName) {
      this.firstName = data.firstName
    }
  }
}