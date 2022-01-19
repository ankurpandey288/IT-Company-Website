using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using Api_zdesk.Models;

namespace ZSD.Controllers
{
    public class EmployeeadminController : Controller
    {
        // GET: Employeeadmin
        public ActionResult employee()
        {
            return View();
        }
        public ActionResult AssignWork()
        {
            return View();
        }

        public JsonResult Email(Assign_Work aw)
        {
            string id, pass, sub, to;
            to = aw.email;
            id = "zservicedesk121@gmail.com";
            pass = "Scroll@121";
            //to ;
            sub = "New Task Assigned";
            try
            {
                MailMessage mail1 = new MailMessage();
                mail1.From = new MailAddress(id);
                mail1.To.Add(to);
                mail1.Subject = sub;
                mail1.IsBodyHtml = true;
                mail1.Body = "Task description :\n" + aw.assign_work + "\n" + "Deadline Date : " + aw.t_date;
                SmtpClient s = new SmtpClient("smtp.gmail.com");
                s.DeliveryMethod = SmtpDeliveryMethod.Network;
                s.UseDefaultCredentials = false;
                s.EnableSsl = true;
                s.Port = 587;
                s.Credentials = new NetworkCredential(id, pass);
                s.Send(mail1);
                return Json("Task assigned and email sent successfully!");
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
        }
        public ActionResult dailywork()
        {
            return View();
        }
    }
}