export const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "Authentication required" });
        next();
    }

    next();
};

export const isAdmin = (req, res, next) => {
    if (
        (!req.user.admin && !req.isAuthenticated()) ||
        req.user.admin == undefined
    ) {
        res.status(401).json({ message: "Access unauthorized" });
        next();
    }
    console.log(req.user.admin);
    next();
};
