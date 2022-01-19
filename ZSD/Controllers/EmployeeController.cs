using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ZSD.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Employeeregisterform()
        {
            return View();
        }
        public ActionResult Activity()
        {
            return View();
        }
        public ActionResult AddActivity()
        {
            return View();
        }
        public ActionResult AssignWork()
        {
            return View();
        }
        public ActionResult Employee()
        {
            return View();
        }
    }
}