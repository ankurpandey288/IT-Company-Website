using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using PetaPoco;
using Api_zdesk.Models;
using System.Web;
using System.IO;
using System.Net.Mail;

namespace Api_zdesk.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CommonApiController : ApiController
    {
        [HttpPost]
        public CommonStatus AddUserToLoginTbl(UserLogin ul)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            CommonStatus data = db.SingleOrDefault<CommonStatus>
                ("exec zsd_insert_reg_details_user_login_sp @email, @password,@created_by,@role_id",
                new { ul.email, ul.password, ul.created_by, ul.role_id });
            return data;
        }
        [HttpPost]
        public UserLogin Login(UserLogin ul)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            UserLogin data = db.SingleOrDefault<UserLogin>
                ("exec zsd_sp_user_login @email, @password",
                new { ul.email, ul.password });
            return data;
        }
        [HttpPost]
        public CommonStatus AddUserToRegTbl(User_Registratrion u)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            CommonStatus cms = db.SingleOrDefault<CommonStatus>
                ("exec zsd_insert_reg_details_user_registration_sp @Company_Id,@Designation,@Contact_Number,@Address,@City,@Country,@Email_ID,@Created_By,@name",
                new { u.Company_Id, u.Designation, u.Contact_Number, u.Address, u.City, u.Country, u.Email_ID, u.Created_By, u.name});
            return cms;
        }
        [HttpPost]
        public CommonStatus AddNewCompany(Company_Registration a)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            CommonStatus cms = db.SingleOrDefault<CommonStatus>
                ("exec zsd_insert_Company_Registration_sp @Email_Id,@Contact_Name,@Contact_Number,@Company_Name,@Establishmennt,@No_Of_Employees,@Address,@City,@Country_name,@Desc_Bussiness,@Turn_over",
                new { a.Email_Id, a.Contact_Name, a.Contact_Number, a.Company_Name, a.Establishmennt, a.No_Of_Employees, a.Address, a.City, a.Country_name, a.Desc_Bussiness, a.Turn_over });
            return cms;
        }
        [HttpGet]
        public IEnumerable<Company_Registration> GetCompany()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<Company_Registration>("exec zsd_get_company_for_signup_sp");
        }
        [HttpGet]
        public IEnumerable<User_Registratrion> GetAlluser()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<User_Registratrion>("exec zsd_get_all_users_sp");
        }
        [HttpPost]
        public CommonStatus InsMarket(Marketing_Doc cr)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_insert_Marketing_doc_details_sp @File_Name,@Descript,@Category,@File_Path",
                new { cr.File_Name, cr.Descript, cr.Category,cr.File_Path });
        }
        [HttpGet]
        public IEnumerable<Marketing_Doc> GetDocs()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<Marketing_Doc>("exec zsd_Get_Marketing_doc_details_sp");
        }
        [HttpPost]
        public CommonStatus InsDeal(Deal b)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_insert_deal_sp @Login_Id,@Opp_Name,@Cust_Name,@Focus_Ind,@Address,@City,@Country,@Cont_Person,@Cont_Name,@Busi_Mail,@Req_Desc,@Depl_Type,@Num_Tech,@Num_Assets,@Exp_Close,@Services,@Licensing_Subscription",
                new { b.Login_Id, b.Opp_Name, b.Cust_Name, b.Focus_Ind, b.Address, b.City, b.Country, b.Cont_Person, b.Cont_Name, b.Busi_Mail, b.Req_Desc, b.Depl_Type, b.Num_Tech, b.Num_Assets, b.Exp_Close,b.Services,b.Licensing_Subscription });
        }
        [HttpGet]
        public IEnumerable<Deal> GetDeals()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<Deal>("exec zsd_get_deal_sp");
        }
        [HttpPost]
        public Deal getdealbyid(Deal d)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<Deal>("exec zsd_get_deal_by_id_sp @Deal_Id",
                new { d.Deal_Id });
        }
        [HttpPost]
        public Blogs_Info getblogsbyid(Blogs_Info d)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<Blogs_Info>("exec zdesk_get_blogs_by_id_sp @Id",
                new { d.Id });
        }
        [HttpPost]
        public CommonStatus upduserstatus(User_Registratrion d)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_update_user_status_by_id_sp @id,@is_active", 
                new { d.id,d.is_active }); 
        }
        [HttpPost]
        public CommonStatus UpdateDealById(Deal s)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("Exec zdesk_upd_deal_by_id_sp @Deal_Id,@Opp_Name,@Cust_Name,@Focus_Ind,@Address,@City,@Country,@Cont_Person,@Cont_Name,@Busi_Mail,@Req_Desc,@Depl_Type,@Num_Tech,@Num_Assets,@Exp_Close,@Services,@Licensing_Subscription ",
                       new { s.Deal_Id,s.Opp_Name,s.Cust_Name,s.Focus_Ind,s.Address,s.City,s.Country,s.Cont_Person,s.Cont_Name,s.Busi_Mail,s.Req_Desc,s.Depl_Type,s.Num_Tech,s.Num_Assets,s.Exp_Close,s.Services,s.Licensing_Subscription });
        }
        [HttpPost]
        public CommonStatus ChangePassword(UserLogin ul)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_change_password_sp @id, @password", new { ul.id, ul.password });
        }
        [HttpPost]
        public CommonStatus videos(videos_upload uk)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_insert_video_link_sp @heading,@paste_link", new { uk.heading, uk.paste_link });
        }
        [HttpGet]
        public IEnumerable<videos_upload> linkupload()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<videos_upload>("exec zsd_get_video_details_sp");
        }
        [HttpPost]
        public Company_Registration Pdetails(UserLogin nl)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<Company_Registration>("exec zsd_admin_profile_details_sp @id", new { nl.id });
        }
        [HttpGet]
        public IEnumerable<User_Registratrion> GetUsers()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<User_Registratrion>("zsd_get_user_list_sp");

        }
        [HttpPost]
        public CommonStatus Employee(UserLogin ul)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_insert_reg_details_employee_login_sp @email, @password, @role_id ", new { ul.email, ul.password, ul.role_id });
        }
        [HttpPost]
        public CommonStatus EmployeeReg(Employee_Registration al)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_insert_Employee_Registration_sp @Name,@Contact_number,@Email_id, @Designation ", new { al.Name,al.Contact_number,al.Email_id,al.Designation});
        }
        [HttpGet]
        public IEnumerable<Employee_Registration> GetEmployee()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<Employee_Registration>("[Get_Employee_Registration_List_sp]");

        }
        [HttpPost]
        public CommonStatus InsActivity(Daily_Activity bl)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_insert_Activity_Info_sp @task,@user_id", new {bl.task,bl.user_id});
        }
        [HttpPost]
        public IEnumerable<Daily_Activity> GetActivity(Daily_Activity cl)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<Daily_Activity>("exec zsd_get_activity_sp @user_id",new { cl.user_id});
        }
        [HttpPost]
        public CommonStatus InsAssignwork(Assign_Work gl)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_insert_Aassign_work_Info_sp @user_id, @assign_work ,@t_date,@deadline", new {gl.user_id, gl.assign_work,gl.t_date,gl.deadline});
        }
        [HttpGet]
        public IEnumerable<Employee_Registration> Getempfortaskdetails()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<Employee_Registration>("exec zsd_get_emp_for_activity_table_sp");
        }
        [HttpPost]
        public IEnumerable<Assign_Work> Getassignwork(Assign_Work dl)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<Assign_Work>("exec zsd_get_assign_work_sp  @user_id", new { dl.user_id });
        }
        [HttpPost]
        public CommonStatus InsBlog(Blogs_Info ar)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_insert_Blog_Info_sp @Heading,@Describe,@Image_Link",
                new { ar.Heading,ar.Describe,ar.Image_Link });
        }
        [HttpGet]
        public IEnumerable<Blogs_Info> GetBlog()
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.Query<Blogs_Info>("exec zsd_get_Blog_sp");
        }
        [HttpPost]
        public void UploadOrgFile()
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                // Get the uploaded file from the Files collection
                var httpPostedFile = HttpContext.Current.Request.Files["UploadedFile"];
                string DocFolderName = HttpContext.Current.Request.Form["UniqueID"].ToString();
                string DocCategory = HttpContext.Current.Request.Form["DocFolderPath"].ToString();
                string DocSubCategory = HttpContext.Current.Request.Form["Category"].ToString();

                if (httpPostedFile != null)
                {
                    ////HttpContext.Current.Session["ProposalID"] = 1;
                    ////var ProposalID = Convert.ToInt32(HttpContext.Current.Session["ProposalID"]);
                    var TempFolderPath = "~/DocFolder/" + DocCategory;
                    var DocFolderPath = TempFolderPath + "/" + DocFolderName;
                    //// var CategoryFolderPath = DocFolderPath + "/" + DocSubCategory;

                    if (!(Directory.Exists(HttpContext.Current.Server.MapPath(TempFolderPath))))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(TempFolderPath));
                    }

                    if (!(Directory.Exists(HttpContext.Current.Server.MapPath(DocFolderPath))))
                    {
                        Directory.CreateDirectory(HttpContext.Current.Server.MapPath(DocFolderPath));
                    }

                    //////if (!(Directory.Exists(HttpContext.Current.Server.MapPath(CategoryFolderPath))))
                    //////{
                    //////    Directory.CreateDirectory(HttpContext.Current.Server.MapPath(CategoryFolderPath));
                    //////}

                    ClearFolder(HttpContext.Current.Server.MapPath(DocFolderPath));

                    ////ClearFolder(HttpContext.Current.Server.MapPath(TempFolderPath));

                    var fileSave = HttpContext.Current.Server.MapPath(DocFolderPath);
                    var fileSavePath = Path.Combine(fileSave, httpPostedFile.FileName);
                    httpPostedFile.SaveAs(fileSavePath);
                }
            }
        }
        public void ClearFolder(string FolderName)
        {
            if (Directory.Exists(FolderName))
            {
                DirectoryInfo dir = new DirectoryInfo(FolderName);

                foreach (FileInfo fi in dir.GetFiles())
                {
                    fi.Delete();
                }

                foreach (DirectoryInfo di in dir.GetDirectories())
                {
                    ClearFolder(di.FullName);
                    di.Delete();
                }
            }
            else
            {
                Directory.CreateDirectory(FolderName);
            }
        }
        [HttpPost]
        public CommonStatus SendCompRegMail(Emailtemplate et)
        {
            CommonStatus cms = new CommonStatus();
            string t_path = HttpContext.Current.Server.MapPath("~/emailtemp/email.html");
            string body = File.ReadAllText(t_path);
            body.Replace("{user}", et.name);
            string id, pass, sub;
            id = "zservicedesk121@gmail.com";
            pass = "Scroll@121";
            sub = "Registration Confirmation Mail";
            try
            {
                MailMessage mail1 = new MailMessage();
                mail1.From = new MailAddress(id);
                mail1.To.Add(et.mail);
                mail1.Subject = sub;
                mail1.IsBodyHtml = true;
                mail1.Body = body;
                SmtpClient s = new SmtpClient("smtp.gmail.com");
                s.DeliveryMethod = SmtpDeliveryMethod.Network;
                s.UseDefaultCredentials = false;
                s.EnableSsl = true;
                s.Port = 587;
                s.Credentials = new NetworkCredential(id, pass);
                s.Send(mail1);
                cms.status_id = 1;
                return cms;
            }
            catch (Exception)
            {
                cms.status_id = 0;
                return cms;
            }
        }
        [HttpPost]
        public User_Registratrion Getuserprofile(UserLogin ul)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<User_Registratrion>("exec zsd_get_user_profile_sp @id",new { ul.id });
        }
        [HttpPost]
        public CommonStatus chandstatus(Assign_Work tl)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_update_status_sp @id,@status", new { tl.id,tl.status});
        }
        [HttpPost]
        public CommonStatus changedealstatus(Deal tl)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_update_deal_status_sp @Deal_Id,@Approval_status", new { tl.Deal_Id, tl.Approval_status });
        }
        [HttpPost]
        public CommonStatus changecompletiondate(Assign_Work ta)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("exec zsd_update_Completion_date_sp @id,@completion_date", new { ta.id,ta.completion_date });
        }
        [HttpPost]
        public Employee_Registration Userbyid(Employee_Registration tb)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<Employee_Registration>("exec zsd_get_single_user_data @Login_Id", new { tb.Login_Id });
        }

        [HttpPost]
        public CommonStatus Deletework(Assign_Work s)
        {
            var db = new Database("Constr");
            db.EnableAutoSelect = false;
            return db.SingleOrDefault<CommonStatus>("Exec zsd_del_work  @id", new { s.id});
        }


    }
}

