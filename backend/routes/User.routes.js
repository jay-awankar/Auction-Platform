import User from "../schema/User.schema.js";

export const userSignUp = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) 
      {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      //const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password });
      await newUser.save();//a new user is being created in db
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Signup Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

export const userSignIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = sign({ userId: user._id, username }, SECRET_KEY, { expiresIn: '1h' });
      //this token helps the user to remain signed in for an 1hour
      
      res.json({ message: 'Signin successful', token });
  
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  }