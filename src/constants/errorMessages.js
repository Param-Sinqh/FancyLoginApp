const errorMessages = {
    internalServerError: [
      { title: "Oops!", content: "Something went wrong on our end." },
      { title: "Error!", content: "Internal server issue. Please try again later." },
      { title: "Whoops!", content: "There was a problem processing your request." },
      { title: "Uh-oh!", content: "Internal error, please try again shortly." },
      { title: "Uh-oh!", content: "Oops, we couldn't complete your request!" },
      { title: "Oh no!", content: "Our servers are having trouble right now." },
      { title: "Whoops!", content: "Something's wrong, we're fixing it!" },
      { title: "Hold on!", content: "We're experiencing some issues on our side." },
      { title: "Oops!", content: "Server error, please be patient." },
      { title: "Uh-oh!", content: "There seems to be a server problem!" }
    ],
  
    credentialsMismatch: [
      { title: "Oops!", content: "Check your username or password." },
      { title: "Error!", content: "The credentials you provided do not match." },
      { title: "Hmm!", content: "Something doesn’t match. Please check your credentials." },
      { title: "Whoops!", content: "Invalid credentials, please try again." },
      { title: "Uh-oh!", content: "The login information is incorrect." },
      { title: "Sorry!", content: "Credentials mismatch. Double-check and try again." },
      { title: "Oops!", content: "The username or password seems to be incorrect." },
      { title: "Error!", content: "We couldn't find your account, check your details." },
      { title: "Hmm...", content: "Looks like something's off with your login info." },
      { title: "Oh no!", content: "We couldn't log you in, please verify your credentials." }
    ],
  
    requestTimeout: [
      { title: "Uh-oh!", content: "The request timed out. Please try again later." },
      { title: "Oops!", content: "Your request took too long. Please try again." },
      { title: "Hmm...", content: "It seems like the request is taking longer than expected." },
      { title: "Whoops!", content: "Request timeout. Give it another shot." },
      { title: "Oh no!", content: "The connection timed out. Try again shortly." },
      { title: "Wait a second!", content: "The request timed out. Let's try that again." },
      { title: "Sorry!", content: "Something went wrong. The request took too long." },
      { title: "Uh-oh!", content: "Your request couldn't be completed due to a timeout." },
      { title: "Hmm!", content: "It seems like we're taking longer than expected." },
      { title: "Oh no!", content: "The connection was lost. Please try again." }
    ],
  
    networkProblem: [
      { title: "Uh-oh!", content: "It seems like you're not connected to the internet." },
      { title: "Oops!", content: "We can't reach the server. Check your network connection." },
      { title: "Whoops!", content: "Network problem, please check your internet connection." },
      { title: "Hmm!", content: "It looks like you're offline. Please connect to the internet." },
      { title: "Sorry!", content: "We couldn't establish a connection. Please check your network." },
      { title: "Oh no!", content: "We’re having trouble connecting. Check your network." },
      { title: "Oops!", content: "We couldn't connect. Check your internet connection." },
      { title: "Whoops!", content: "No internet connection found, please check your network." },
      { title: "Uh-oh!", content: "Network error, please ensure you're connected to the internet." },
      { title: "Hmm...", content: "It seems there's a problem with your network connection." }
    ],
  
    emailAlreadyInUse: [
      { title: "Oops!", content: "The email is already in use. Please try another." },
      { title: "Whoops!", content: "This email address is already registered." },
      { title: "Hmm!", content: "Looks like someone else has already registered with this email." },
      { title: "Uh-oh!", content: "Email already exists. Please use a different one." },
      { title: "Oh no!", content: "This email is already taken. Please choose another." },
      { title: "Oops!", content: "The email is already in use. Please check your details." },
      { title: "Whoops!", content: "Someone has already signed up with this email address." },
      { title: "Sorry!", content: "This email is already registered, please use a different one." },
      { title: "Uh-oh!", content: "This email is already in use, try another one." },
      { title: "Oh no!", content: "This email is already taken, please choose a new one." }
    ],
  
    userNotFound: [
      { title: "Uh-oh!", content: "We couldn't find a user with this email. Please sign up." },
      { title: "Oops!", content: "No user found with this email. Please sign up." },
      { title: "Whoops!", content: "No account found. Please create a new account." },
      { title: "Sorry!", content: "We couldn't find your account. Please sign up first." },
      { title: "Hmm!", content: "We can't find a user with that email. Please sign up." },
      { title: "Oh no!", content: "User not found. Please register to continue." },
      { title: "Uh-oh!", content: "We couldn't find your account. Sign up instead!" },
      { title: "Oops!", content: "No user found with this email. Please create one." },
      { title: "Hmm...", content: "We couldn’t find your account, please sign up." },
      { title: "Whoops!", content: "Looks like we couldn't find a user with this email. Sign up?" }
    ]
  };
  

  export default errorMessages;