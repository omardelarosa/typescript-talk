"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
var api_1 = require("@app/shared/api");
var path = __importStar(require("path"));
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var PORT = 3000;
var ROOT_DIR = path.join(__dirname, "../..");
app.use(express_1.default.static(ROOT_DIR));
app.get("/api", function (req, res) {
    var api = new api_1.API();
    res.send(api.render());
});
app.listen(PORT, function () { return console.log("Example app listening on port " + PORT + "!"); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStCO0FBRS9CLHVDQUFzQztBQUN0Qyx5Q0FBNkI7QUFFN0Isb0RBQXlFO0FBRXpFLElBQU0sR0FBRyxHQUFZLGlCQUFPLEVBQUUsQ0FBQztBQUMvQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDL0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBRWxDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDMUMsSUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztJQUN0QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBRUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQWlDLElBQUksTUFBRyxDQUFDLEVBQXJELENBQXFELENBQUMsQ0FBQyJ9