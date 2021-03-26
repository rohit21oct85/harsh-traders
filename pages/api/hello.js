// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if(req.method === 'POST'){
    res.status(200).json({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: req.body.password
    })
  }else{
    res.status(200).json({ name: 'John Doe' })
  }
}
