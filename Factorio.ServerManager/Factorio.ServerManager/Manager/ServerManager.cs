namespace Factorio.ServerManager.Manager
{
    using System.Diagnostics;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;

    public class ServerManager
    {
        private readonly IHubContext<ServerManagerHub> hubContext;
        private Process p;

        public ServerManager(IHubContext<ServerManagerHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        public ServerStatus Status { get; private set; }

        public string RecentOutput { get; private set; }

        private Task ChangeStatus(ServerStatus newStatus)
        {
            var oldStatus = this.Status;
            this.Status = newStatus;

            return this.hubContext.Clients.All.SendAsync("server", new ServerNotification<StatusPayload>
            {
                NotificationType = NotificationType.StatusChange,
                Payload = new StatusPayload
                {
                    OldStatus = oldStatus,
                    NewStatus = newStatus
                }
            });
        }

        public async Task Start()
        {
            //var p = new Process
            //{
            //    StartInfo = new ProcessStartInfo()
            //};
            await this.ChangeStatus(ServerStatus.Started);
        }

        public async Task Stop()
        {
            await this.ChangeStatus(ServerStatus.Stopped);
        }
    }
}