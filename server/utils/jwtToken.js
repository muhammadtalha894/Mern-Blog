export const jwtToken = async (res, user) => {
  const token = await user.generateToken(user._id);

  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  };

  const { password, ...User } = user._doc;

  res
    .status(200)
    .cookie('access_blog_token', token, options)
    .json({ success: true, User, token });
};
