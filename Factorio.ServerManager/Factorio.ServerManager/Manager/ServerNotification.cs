namespace Factorio.ServerManager.Manager
{
    public class ServerNotification<T>
    {
        public NotificationType NotificationType { get; set; }

        public T Payload { get; set; }
    }
}