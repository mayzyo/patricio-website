using Microsoft.AspNetCore.Mvc;
using System;

public static partial class ControllerBaseExtensions
{
    public static bool PrincipalAccepted(this ControllerBase controller)
    {
#if DEBUG
        return true;
#endif
        if (Environment.GetEnvironmentVariable("CHINA") == "True") return false;
        var principal = controller.Request.Headers["X-MS-CLIENT-PRINCIPAL-NAME"];
        return (principal == "michaelziyumay@gmail.com" || principal == "kazenowindflowe9@gmail.com");
    }
}