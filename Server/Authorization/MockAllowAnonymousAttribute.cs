namespace Server.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class MockAllowAnonymousAttribute : Attribute
    {
    }
}
