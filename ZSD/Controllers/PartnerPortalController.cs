using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Api_zdesk.Models;

namespace ZSD.Controllers
{
    public class PartnerPortalController : Controller
    {
        // GET: PartnerPortal
        public ActionResult Login()
        {
            UserLogin ul = new UserLogin();
            return View(ul);
        }
        [HttpPost]
        public ActionResult Login(UserLogin ul)
        {
            UserLogin emp = new UserLogin();
            if (ModelState.IsValid)
            {
                emp = validLogin(ul.email, ul.password);
                if (emp.id == 0)
                {
                    ViewBag.Message = "User Not Found : Please Enter valid  Credentilal";
                    return View(ul);
                }
                else
                {
                    Session["User"] = emp.email;
                    Session["user_id"] = emp.id;
                    Session["Role"] = emp.role_id;
                    Session["email"] = emp.email;
                    if (emp.role_id == 1)
                    {
                        return RedirectToAction("AdminProfile", "Admin");
                    }
                    if (emp.role_id == 2)
                    {
                        return RedirectToAction("Index", "Company");
                    }
                    if (emp.role_id == 3)
                    {
                        return RedirectToAction("UserProfile", "Users");
                    }
                    if (emp.role_id == 4)
                    {
                        return RedirectToAction("AssignWork", "Employee");
                    }
                    if (emp.role_id == 5)
                    {
                        return RedirectToAction("employee", "Employeeadmin");
                    }
                }
            }
            ViewBag.Message = "Invalid entry.";
            return View(ul);
        }
        [NonAction]
        public UserLogin validLogin(string emp_email, string emp_password)
        {
            var input2 = new
            {
                email = emp_email,
                password = emp_password,
            };
            string inputJson2 = new JavaScriptSerializer().Serialize(input2);
            WebClient client2 = new WebClient();
            client2.Headers["Content-type"] = "application/json";
            client2.Encoding = Encoding.UTF8;
            string json = client2.UploadString("https://zservicedesk.com/api/api/CommonApi/Login", inputJson2);
            //string json = client2.UploadString("https://localhost:44338/api/CommonApi/Login", inputJson2);
            UserLogin emp = new JavaScriptSerializer().Deserialize<UserLogin>(json);
            return emp;
        }
        public ActionResult SignUp()
        {
            return View();
        }
        public ActionResult SignUp_User()
        {
            return View();
        }
        public ActionResult Company_Register()
        {
            return View();
        }
        public ActionResult Forget_password()
        {
            return View();
        }
        public ActionResult AddDocs()
        {
            return View();
        }
        public ActionResult ViewDocs()
        {
            return View();
        }
        public ActionResult Companies()
        {
            return View();
        }
        public ActionResult Home()
        {
            return View();
        }
        public ActionResult User_Registration()
        {
            return View();
        }
        public ActionResult EmployeePortal()
        {
            UserLogin ul = new UserLogin();
            return View(ul);
        }
        public ActionResult ForgotPasswordPortal()
        {
            return View();
        }
        public ActionResult Logout()
        {
            Session.Abandon();
            TempData.Clear();
            Session.Remove("User");
            Session.Remove("user_id");
            Session.Remove("Role");
            return RedirectToAction("Login", "PartnerPortal");
        }
        public JsonResult uploadFile()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    HttpFileCollectionBase files = Request.Files;
                    HttpPostedFileBase file = files[0];
                    string fileName = file.FileName;

                    // create the uploads folder if it doesn't exist
                    if (!Directory.Exists(Server.MapPath("~/MarketingDocs/")))
                    {
                        Directory.CreateDirectory(Server.MapPath("~/MarketingDocs/"));
                    }
                    string path = Path.Combine(Server.MapPath("~/MarketingDocs/"), fileName);
                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                        file.SaveAs(path);
                    }
                    else
                    {
                        // save the file
                        file.SaveAs(path);
                    }
                    return Json("File uploaded successfully");
                }
                catch (Exception e)
                {
                    return Json("error" + e.Message);
                }
            }
            return Json("No files were selected!");
        }
    }
}