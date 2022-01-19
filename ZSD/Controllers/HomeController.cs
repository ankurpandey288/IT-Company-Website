using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace ZSD.Controllers
{
    public class HomeController : Controller
    {
        //Index Page
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Termsoflicence()
        {
            return View();
        }
        public ActionResult FAQ()
        {
            return View();
        }
        public ActionResult Contact()
        {
            if (TempData["Contact"] != null)
            {
                ViewBag.msg = TempData["Contact"];
                TempData.Remove("Contact");
            }
            return View();
        }
        [HttpPost]
        public ActionResult Contact(FormCollection fc)
        {
            string id, pass, sub, to;
            id = "zservicedesk121@gmail.com";
            pass = "Scroll@121";
            to = "deepak@zservicedesk.com";
            sub = "Query/Enquiry";
            try
            {
                MailMessage mail1 = new MailMessage();
                mail1.From = new MailAddress(fc["Email"]);
                mail1.To.Add(to);
                mail1.Subject = sub;
                mail1.IsBodyHtml = true;
                mail1.Body = "Name : " + fc["Name"] + "<br/> Company name : " + fc["Companyname"] + "<br/> Email : " + fc["Email"] + "<br/> Phone : " + fc["Phone"] + "<br/> Message : " + fc["comment"];
                SmtpClient s = new SmtpClient("smtp.gmail.com");
                s.DeliveryMethod = SmtpDeliveryMethod.Network;
                s.UseDefaultCredentials = false;
                s.EnableSsl = true;
                s.Port = 587;
                s.Credentials = new NetworkCredential(id, pass);
                s.Send(mail1);
                TempData["Contact"] = "Thank you. We have Successfully received your request. Our representative will in touch with you within 24 hours.";
                return RedirectToAction("Contact", "Home");
            }
            catch (Exception e)
            {
                //TempData["Partner_With_Us"] = "Something went wrong!";
                TempData["Contact"] = "Error" + e.Message;
                return RedirectToAction("Contact");
            }
        }
        public ActionResult Blogs()
        {
            return View();
        }
        public ActionResult ENTERPRISESERVICEDESK()
        {
            return View();
        }
        public ActionResult ASSETMANAGEMENT()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult AIBOTASSISTANT()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Grc()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Request_live_demo()
        {
            if (TempData["Request_live_demo"] != null)
            {
                ViewBag.msg = TempData["Request_live_demo"];
                TempData.Remove("Request_live_demo");
            }
            return View();
        }
        [HttpPost]
        public ActionResult Request_live_demo(FormCollection fb)
        {
            string id, pass, sub, to;
            id = "zservicedesk121@gmail.com";
            pass = "Scroll@121";
            to = "deepak@zservicedesk.com";
            sub = "Query/Enquiry";
            try
            {
                MailMessage mail1 = new MailMessage();
                mail1.From = new MailAddress(fb["Email"]);
                mail1.To.Add(to);
                mail1.Subject = sub;
                mail1.IsBodyHtml = true;
                mail1.Body = "Name : " + fb["Name"] + "<br/> Last Name : " + fb["lastname"] + "<br/> E-mail : " + fb["Email"] + "<br/> Phone : " + fb["phone"] + "<br/> Company Name : " + fb["Company"] + "<br/> Employees : " + fb["empcount"] + "<br/> Designation : " + fb["Designation"] + "<br/> Country : " + fb["country"];
                SmtpClient s = new SmtpClient("smtp.gmail.com");
                s.DeliveryMethod = SmtpDeliveryMethod.Network;
                s.UseDefaultCredentials = false;
                s.EnableSsl = true;
                s.Port = 587;
                s.Credentials = new NetworkCredential(id, pass);
                s.Send(mail1);
                TempData["Request_live_demo"] = "Thank you. We have Successfully received your request. Our representative will in touch with you within 24 hours.";
                return RedirectToAction("Request_live_demo", "Home");
            }
            catch (Exception e)
            {
                //TempData["Partner_With_Us"] = "Something went wrong!";
                TempData["Request_live_demo"] = "Error" + e.Message;
                return RedirectToAction("Request_live_demo");
            }
        }
        public ActionResult Partner_With_Us()
        {
            if (TempData["Partner_With_Us"] != null)
            {
                ViewBag.msg = TempData["Partner_With_Us"];
                TempData.Remove("Partner_With_Us");
            }
            return View();
        }
        [HttpPost]
        public ActionResult Partner_With_Us(FormCollection fa)
        {
            string id, pass, sub, to;
            id = "zservicedesk121@gmail.com";
            pass = "Scroll@121";
            to = "deepak@zservicedesk.com";
            sub = "Query/Enquiry";
            try
            {
                MailMessage mail1 = new MailMessage();
                mail1.From = new MailAddress(fa["Email"]);
                mail1.To.Add(to);
                mail1.Subject = sub;
                mail1.IsBodyHtml = true;
                mail1.Body = "Name : " + fa["Name"] + "<br/> Last Name : " + fa["lastname"] + "<br/> E-mail : " + fa["Email"] + "<br/> Phone : " + fa["phone"] + "<br/> Company Name : " + fa["Company"] + "<br/> Employees : " + fa["EmpCount"] + "<br/> Designation : " + fa["Designation"] + "<br/> Country : " + fa["country"] + "<br/> Year of Inception : " + fa["Yearofinception"] + "<br/> Describe Your bussiness Details : " + fa["comment"];
                SmtpClient s = new SmtpClient("smtp.gmail.com");
                s.DeliveryMethod = SmtpDeliveryMethod.Network;
                s.UseDefaultCredentials = false;
                s.EnableSsl = true;
                s.Port = 587;
                s.Credentials = new NetworkCredential(id, pass);
                s.Send(mail1);
                TempData["Partner_With_Us"] = "Thank you. We have Successfully received your request. Our representative will in touch with you within 24 hours.";
                return RedirectToAction("Partner_With_Us", "Home");
            }
            catch (Exception e)
            {
                //TempData["Partner_With_Us"] = "Something went wrong!";
                TempData["Partner_With_Us"] = "Error" + e.Message;
                return RedirectToAction("Partner_With_Us");
            }
        }
        public ActionResult Privacypolicy()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Termscondition()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Disclaimer()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Cookiespolicy()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Enterprise_Service_Desk()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Asset_Management()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Governance_Risk_Compliance()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Cookies_policy()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Privacy_Policy()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Terms_of_Licence()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Terms_Conditions()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Login_Form()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }

}