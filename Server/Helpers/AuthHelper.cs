using Server.Dtos;
using System.Text.RegularExpressions;

namespace Server.Helpers
{
    public class AuthHelper
    {
        private static readonly Regex emailRegex = new("/(?: [a-z0-9!#$%&'*+\\x2f=?^_`\\x7b-\\x7d~\\x2d]+(?:\\.[a-z0-9!#$%&'*+\\x2f=?^_`\\x7b-\\x7d~\\x2d]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9\\x2d]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9\\x2d]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\\x2d]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])/");

        public static List<string> ValidateRegistration(RegisterDto registerDto)
        {
            List<string> result = [];

            if (String.IsNullOrEmpty(registerDto.Email)) result.Add("Email is required.");
            if (emailRegex.IsMatch(registerDto.Email)) result.Add("Invalid email address.");

            if (String.IsNullOrEmpty(registerDto.Username)) result.Add("Username is required.");
            if (registerDto.Username.Length < 5 || registerDto.Username.Length > 20) result.Add("Username must be between 5 and 20 characters.");

            if (String.IsNullOrEmpty(registerDto.Password)) result.Add("Password is required.");
            else
            {
                if (!new Regex("/[0 - 9]/g").IsMatch(registerDto.Password))
                {
                    result.Add("Password must contain at least one number.");
                }
                if (!new Regex("/[A - Z]/").IsMatch(registerDto.Password))
                {
                    result.Add("Password must contain at least one capital letter.");
                }
                if (!new Regex("/[!@#$%^*()_+\\-=\\[\\]{}|\\\\,.?:-]/").IsMatch(registerDto.Password)) {
                    result.Add("Password must contain at least one special character.");
                }
            }
            if (String.IsNullOrEmpty(registerDto.FirstName)) result.Add("First name is required.");
            if (registerDto.FirstName.Length < 2) result.Add("Invalid first name.");

            if (String.IsNullOrEmpty(registerDto.LastName)) result.Add("Last name is required.");
            if (registerDto.LastName.Length < 2) result.Add("Invalid last name.");

            if (registerDto.ProfileImage == null) result.Add("Profile Image is required.");

            return result;
        }
    }
}
