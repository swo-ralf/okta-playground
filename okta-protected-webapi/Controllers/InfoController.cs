using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace OktaProtectedWebApi.Controllers
{
    [ApiController]
    [Route("info")]
    public class InfoController : ControllerBase
    {
        [HttpGet]
        [Route("whoami")]
        public IDictionary<string, string> GetAuthorized()
        {
            var principal = HttpContext.User.Identity as ClaimsIdentity;
            return principal?.Claims
                .GroupBy(claim => claim.Type)
                .ToDictionary(claim => claim.Key, claim => claim.First().Value) 
                ?? new Dictionary<string, string>();
        }

        [HttpGet]
        [Route("hello")]
        [AllowAnonymous]
        public string GetAnonymous() => "You are anonymous";
    }
}
