const { url } = require("inspector");
const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));
const urls = require(path.resolve("src/data/urls-data"));

function create(req, res) {
    const { data: { href } = {} } = req.body;
    const newUrl = {
      id: urls.length + 1,
      href,
    };
    urls.push(newUrl);
    res.status(201).json({ data: newUrl });
  }
  
  function hasHref(req, res, next) {
    const { data: { href } = {} } = req.body;
    if (href) {
      return next();
    }
    next({ status: 400, message: "A 'href' property is required." });
  }

  function list(req, res) {
 
    res.json({ data: urls});
  }
  function listUses(req,res,next){
      //console.log(res.locals.uses)
      res.json({data:[res.locals.uses]})
  }
  function urlExists(req, res, next) {
    //console.log("pizza")
    const urlId = req.params.urlId;
    const foundUrl = urls.find((url) => url.id == urlId);
    if (foundUrl) {
      res.locals.urls = foundUrl
      return next();
    }
    next({
      status: 404,
      message: `url not found: ${req.params.urlId}`,
    });
  }
  function useExists(req, res, next) {
    const urlId = req.params.urlId;
    const foundUses = uses.find((use) => use.urlId == urlId);
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
  
  function read(req, res) {
    uses.push(
       { id:(uses.length+1),
        urlId:Number(req.params.urlId),
        time:Date.now()}
        )
        console.log(uses)
    res.json({ data:res.locals.urls});
  }
  function readUses (req,res,next){
      res.json({data: {...res.locals.uses}})
  }
  function update(req, res) {
    const {urlId} = req.params;
    const foundUrl = urls.find((url) => url.id == urlId);
    const { data: { href } = {} } = req.body;
    foundUrl.href = href;
    res.json({ data: foundUrl });
  }
  function destroy(req, res) {
    const { useId } = req.params;
    const index = uses.findIndex( (use) => use.id == useId );
    if (index > -1) {
      uses.splice(index, 1);
    }
    res.sendStatus(204);
  }

  module.exports = {
      list,
      listUses:[urlExists,useExists, listUses],
      create:[hasHref,create],
      update:[urlExists, hasHref, update],
      read:[urlExists,read],
      readUses:[urlExists,useExists,readUses],
      delete:destroy
  }