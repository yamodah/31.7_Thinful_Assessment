const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));
const urls = require(path.resolve("src/data/urls-data"));


function destroy(req, res, next) {
    const { useId } = req.params;
    const index = uses.findIndex( (use) => use.id == useId );
    //console.log(index)
    if (index > -1) {
      uses.splice(index, 1);
      res.sendStatus(204);
    }
    next({
        status: 404,
        message: `use not found cannot Delete`,
      });
  }

function useExists(req, res, next) {
    //const urlId = req.params.urlId;
    const foundUses = uses.find((use) => use.id == req.params.useId);
    //console.log(req.params)
    if (foundUses) {
      res.locals.uses = foundUses
      //console.log("note exists")
      return next();
    }
    next({
      status: 404,
      message: `use  not found: ${req.params.useId}`,
    });
  }
function readUses (req,res,next){
    res.json({data: {...res.locals.uses}})
}

function list(req, res) {
 
    res.json({ data: uses});
  }

  module.exports = {
      list,
      delete:destroy,
      read:[useExists,readUses]
  }