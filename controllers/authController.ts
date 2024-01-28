import bcrypt from 'bcryptjs';
import User from '../models/User';
import passportLocal from "passport-local";
import { Request, Response, NextFunction } from 'express'
import { UserForClientProp } from '../types';
import passport from 'passport';

const LocalStrategy = passportLocal.Strategy;

export const SignUp = async (req: Request, res: Response) => {
    try {
        const password = req.body.password;
        const email = req.body.email.toUpperCase();
        const userByEmail = await User.findOne({ email: email });

        if (userByEmail) {
            return res.status(400).send({ message: "Email has already been taken" });
        }

        if (!req.body.email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        bcrypt.hash(password, 10, async (err, hashedPassword) => {
            if (err) console.log(err);
            const user = new User({
                email: email,
                password: hashedPassword,
            });
            await user.save();
            return res.status(200).send({ message: "Created new User" });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
};

export const LogIn = async (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    const email = req.body.email.toUpperCase();
    const userByEmail = await User.findOne({ email: email });

    if (!req.body.email || !password) {
        return res.status(400).send({ message: "All fields are required" });
    } else if (!userByEmail) {
        return res.status(400).send({ message: "Email is incorrect" });
    }

    passport.authenticate("local", (err: any, user: any, info: any) => {
        if (err) {
            console.error(`Error: ${err}`);
            return res.status(500).send({ message: `Error: ${err}` });
        }
        if (!user) {
            console.log("Log in Error:", info);
            return res.status(401).send({ message: `${info.message}` });
        }
        req.logIn(user, function (err) {
            if (err) {
                console.error(`Error: ${err}`);
                return res.status(500).send({ message: `Error: ${err}` });
            }
            return res
                .status(200)
                .send({ message: "Authentication succeeded", user });
        });
    })(req, res, next);
};

export const LogOut = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        return res.status(200).send({ message: "Successfully logged out!" });
    });
};

export const CheckAuthentication = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        const { firstName, lastName, email, createdAt, role, _id } = req.user as UserForClientProp;

        const userInfo = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            createdAt: createdAt,
            role: role,
            _id: _id
        }
        
        res.json(userInfo);
    } else {
        res.status(401).send("Unauthorized");
    }
}

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req: Request, username: any, password: string, done: any) => {
            // Note the addition of 'username' parameter
            try {
                const email = req.body.email; // Get the email from the request
                const userByEmail = await User.findOne({ email: email }); // Look for a user with the email

                if (!userByEmail) {
                    return done(null, false, { message: 'Incorrect email' });
                }

                bcrypt.compare(password, userByEmail.password, (err, res) => {
                    if (err) {
                        return done(err);
                    }

                    if (res) {
                        // Passwords match! Log the user in
                        return done(null, userByEmail);
                    } else {
                        // Passwords do not match
                        return done(null, false, { message: 'Incorrect password' });
                    }
                });
            } catch (err) {
                return done(err);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export const localStrategy = passport.initialize();
export const session = passport.session();
