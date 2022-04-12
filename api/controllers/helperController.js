import { getLinkPreview } from 'link-preview-js'

module.exports.preview = function (req, res) {
  getLinkPreview(req.body.link)
    .then((data) => {
      return res.json(data)
    })
    .catch(err => console.log(err))
}
