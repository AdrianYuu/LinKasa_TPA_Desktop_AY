import { checkWorkEmailUnique } from '@renderer/controllers/AuthController'

// Facade
export default class UserFacade {
  private static instance: UserFacade

  // Singleton.
  public static getInstance(): UserFacade {
    if (!UserFacade.instance) {
      UserFacade.instance = new UserFacade()
    }
    return UserFacade.instance
  }

  public getAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth)
    const today = new Date()
    return today.getFullYear() - dob.getFullYear()
  }

  public async generateWorkEmail(fullName: string): Promise<string> {
    let workEmail = ''
    do {
      workEmail = fullName.split(' ')[0].toLowerCase()
      for (let i = 0; i < 3; i++) {
        const randomNumber = Math.floor(Math.random() * 10)
        workEmail += randomNumber
      }
      workEmail += '@linkasa.com'
    } while (!(await checkWorkEmailUnique(workEmail)))

    return workEmail
  }

  public generatePassword(dateOfBirth: string, fullName: string): string {
    const addLeadingZero = (number: number) => (number < 10 ? `0${number}` : number)
    const dob = new Date(dateOfBirth)
    const day = dob.getDate()
    const month = dob.getMonth() + 1
    const year = dob.getFullYear()

    return fullName.split(' ')[0] + addLeadingZero(day) + addLeadingZero(month) + year
  }
}
