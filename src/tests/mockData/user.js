// Register
export const validRegisterData = [
    {
      email: 'iknagod@gmail.com',
      firstname: 'Ikenna',
      password: 'jamespass',
      lastname: 'James',
    },
    {
      email: 'processenv@gmail.com',
      password: 'jamespass',
      firstname: 'Process',
      lastname: 'Talktrue'
    },
    {
      email: 'wakil@gmail.com',
      password: 'adminpass',
      firstname: 'Process',
      lastname: 'Talktrue',
      is_admin: true
    }
  ];
  
  export const inValidRegisterData = [
    // undefined email 0
    {
      firstname: 'John',
      lastname: 'James',
      password: 'jamespass',
    },
  
    // spaced email 1
    {
      email: 'jja mes@gmail.com',
      firstname: 'John',
      lastname: 'James',
      password: 'jamespass'
    },
  
    // invalid email format 2
    {
      email: 'jjamesgmail.com',
      firstname: 'John',
      lastname: 'James',
      password: 'jamespass',
      address: '23, rondle avenue, Lagos'
    },
    // Existing email 3
    {
      email: 'iknagod@gmail.com',
      firstname: 'John',
      password: 'jamespass',
      lastname: 'James'
    },
  
    // Firstname
    // undefined firstname 4
    {
      email: 'babnla@gmail.com',
      lastname: 'James',
      password: 'jamespass'
    },
    // spaced firstname 5
    {
      email: 'donbabj@gmail.com',
      firstname: 'Ike nna',
      password: 'jamespass',
      lastname: 'James'
    },
    // short firstname length 6
    {
      email: 'iknababa@gmail.com',
      password: 'jamespass',
      firstname: 'I',
      lastname: 'James'
    },
  
    // lastname
    // undefined lastname 7
    {
      email: 'jekyll@gmail.com',
      password: 'jamespass',
      firstname: 'Ikenna'
    },
    // lastname space 8
    {
      email: 'jacintha@gmail.com',
      password: 'jamespass',
      firstname: 'Ikenna',
      lastname: 'Jam es'
    },
  
    // Password
    // undefined password 9
    {
      email: 'iknagod@gmail.com',
      firstname: 'Ikenna',
      lastname: 'James'
    },
    // short password 10
    {
      email: 'seller@gmail.com',
      password: 'js',
      firstname: 'Ikenna',
      lastname: 'James'
    }
  ];
  
  // Login
  export const inValidLoginData = [
    // no email/empty email 0
    {
      password: 'jamiejesss'
    },
  
    // email not found in the db 1
    {
      email: 'jossyoloye@gmail.com',
      password: 'jossyboy'
    },
  
    // no password/empty password 2
    {
      email: 'iknagod@gmail.com'
    },
    // password not in db 3
    {
      email: 'iknagod@gmail.com',
      password: 'lasiselenu'
    }
  ];