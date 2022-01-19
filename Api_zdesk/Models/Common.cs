using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Services;

namespace Api_zdesk.Models
{
    public class CommonStatus
    {
        public string status { get; set; }
        public string subject { get; set; }
        public Nullable<int> status_id { get; set; }
        public int _id { get; set; }
    }
    public class UserLogin
    {
        public int id { get; set; }
        [DataType(DataType.EmailAddress)]
        //[Required(ErrorMessage = "Mandatory Field.")]
        public string email { get; set; }
        [DataType(DataType.Password)]
        //[Required(ErrorMessage = "Mandatory Field.")]
        public string password { get; set; }
        public int is_active { get; set; }
        public int is_delete { get; set; }
        public int created_by { get; set; }
        public DateTime created_date { get; set; }
        public int role_id { get; set; }
        public int is_verified { get; set; }
        public string reset_code { get; set; }
    }
    public class User_Registratrion
    {
        public int id { get; set; }
        public int is_active { get; set; } 
        public int User_Id { get; set; }
        public int Login_Id { get; set; }
        public int Company_Id { get; set; }
        public string company { get; set; }
        public string Email_ID { get; set; }
        public string Designation { get; set; }
        public string Contact_Number { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public int Approved_by { get; set; }
        public int Is_Delete { get; set; }
        public int Created_By { get; set; }
        public int Created_Date { get; set; }
        public string name { get; set; }
        public string Company_Name { get; set; }
        public int status { get; set; }
    }
    public class User_Role
    {
        public int Role_Id { get; set; }
        public string Name { get; set; }
    }
    public class Marketing_Doc
    {
        public int Id { get; set; }
        public string File_Name { get; set; }
        public Nullable<DateTime> Upload_Date { get; set; }
        public string Descript { get; set; }
        public string Category { get; set; }
        public string File_Path { get; set; }
    }
    public class Deal
    {
        public int Deal_Id { get; set; }
        public int Login_Id { get; set; }
        public string Deal_Status { get; set; }
        public string Opp_Name { get; set; }
        public string Cust_Name { get; set; }
        public string Focus_Ind { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Cont_Person { get; set; }
        public string Cont_Name { get; set; }
        public string Busi_Mail { get; set; }
        public string Req_Desc { get; set; }
        public string Depl_Type { get; set; }
        public string Licensing_Subscription { get; set; }
        public int Num_Tech { get; set; }
        public int Num_Assets { get; set; }
        public int Services { get; set; }
        public DateTime Exp_Close { get; set; }
        public int Approval_status { get; set; }
        public DateTime Uploaded_Date { get; set; }
        public DateTime till_date { get; set; }
        public int status { get; set; }
    }
    public class Country
    {
        public int Country_Id { get; set; }
        public string Country_Name { get; set; }
        public int Approved_by { get; set; }
        public int Is_Delete { get; set; }
        public int Created_By { get; set; }
        public DateTime Created_Date { get; set; }
    }
    public class Company_Registration
    {
        public int Company_Id { get; set; }
        public int Login_Id { get; set; }
        public string Email_Id { get; set; }
        public string Contact_Name { get; set; }
        public string Contact_Number { get; set; }
        public string Company_Name { get; set; }
        public int Establishmennt { get; set; }
        public string No_Of_Employees { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country_name { get; set; }
        public int Is_verification { get; set; }
        public int Is_Delete { get; set; }
        public int Created_By { get; set; }
        public string Desc_Bussiness { get; set; }
        public string Turn_over { get; set; }
    }
    public class Blogs_Info
    {
        public int Id { get; set; }
        public string Heading { get; set; }
        public String Describe { get; set; }
        public string Image_Link { get; set; }
    }
    public class videos_upload
    {
        public int Id { get; set; }
        public string heading { get; set; }
        public String paste_link { get; set; }
        public int is_active { get; set; }
    }
    public class Employee_Registration
    {
        public int emp_id { get; set; }
        public int Login_Id { get; set; }
        public string Name { get; set; }
        public string Contact_number { get; set; }
        public string Email_id { get; set; }
        public string Designation { get; set; }
    }
    public class Daily_Activity
    {
        public int Id { get; set; }
        public DateTime task_date { get; set; }
        public string task { get; set; }
        public int user_id { get; set; }
    }
    public class Assign_Work
    {
        public int id { get; set; }
        public Nullable<DateTime> date_task { get; set; }
        public string assign_work { get; set; }
        public string user_id { get; set; }
        public string Name { get; set; }
        public int deadline { get; set; }
        public Nullable<DateTime> t_date { get; set; }
        public int status { get; set; }
        public Nullable<DateTime> completion_date { get; set; }
        public string email { get; set; }
    }
    public class Emailtemplate
    {
        public string name { get; set; }
        public string mail { get; set; }
    }

}