namespace Factorio.ServerManager.Manager
{
    public class StatusPayload
    {
        public ServerStatus NewStatus { get; set; }
        public ServerStatus OldStatus { get; set; }
    }
}