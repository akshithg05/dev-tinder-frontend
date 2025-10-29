# DevTinder

## Steps

- Create a Vite + React app
- Remove unnecessary code and clean up
- Initialize git repository and commit.
- Install and configure tailwind css.
- We will use component library - daisyUI.
- Install daisyUI
- Add NavBar to App.css and play around with code
- Install react router dom
- Create Browser router > Create Routes component
- Create Body and multiple children
- Create an outlet for the children in the body.
- Add a footer.
- Build a login page
- Install Axios
- Solve cors problem by installing cors in backend
- add cors middleware with configuration - origin and credential: true
- Whenever we make API call in axios {withCredentials: true} (Auth will fail, cookie will not be sent from backend)
- Install redux toolkit and react-redux
- Configure a store - appStore
- Provide the store in the root of the application to make it available throughout.
- Create a reducer object in the main store to hold the various slices.
- Create a new file for userSlice.
- In user Slice, give name, intitialize the state, write the actions and reducer functions. IMport the actions and the slice(reducer)
- Import slice in the main store and pass it in the reducers of store.
- Add redux dev tools
- Login and see if data is cmoing into store.
- Refactor code to add constants file.
- If token is not present, redirect user to login page
- If user is not logged in do not allow anty route other than login.
- Built Logout feature and logout modal
- Get feed and feed in the store
- Build the user card.
- Build edit profile page
- Add edit profile form and usercard.
- Add toast notification for saving profile.
- Add Connections page.
- Add connection requests page
- Accept reject connection request in request page
- Swipe left/ swipe right functionality
- Sign up user
- Match or not functionality

## Deployment

- Create free ec2 instance.
- create a key pair and download the .pem file
- store it locally and then change permission of the .pem file "chmod 400 <.pem file>"
- ssh into the ec2 instance using - ssh -i "dev-tinder-frontend-secret.pem" ubuntu@ec2-13-203-195-71.ap-south-1.compute.amazonaws.com
