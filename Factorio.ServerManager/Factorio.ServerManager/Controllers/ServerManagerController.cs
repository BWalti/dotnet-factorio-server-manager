namespace Factorio.ServerManager.Controllers
{
    using System.Threading.Tasks;
    using Factorio.ServerManager.Manager;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class ServerManagerController : ControllerBase
    {
        private readonly ServerManager manager;

        public ServerManagerController(ServerManager manager)
        {
            this.manager = manager;
        }

        [HttpGet("start")]
        public async Task<ActionResult> Start()
        {
            await this.manager.Start();
            return this.Ok(this.manager.Status);
        }

        [HttpGet("stop")]
        public async Task<ActionResult> Stop()
        {
            await this.manager.Stop();
            return this.Ok(this.manager.Status);
        }

        [HttpGet]
        public FactorioServerState Get()
        {
            return new FactorioServerState
            {
                IsRunning = this.manager.Status == ServerStatus.Started
            };
        }
    }
}