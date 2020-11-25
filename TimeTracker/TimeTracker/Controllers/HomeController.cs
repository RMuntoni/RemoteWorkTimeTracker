using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using TimeTracker.Models;

namespace TimeTracker.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(int currentPage = 0, string filter = "")
        {
            //Get the data
            


            var model = new TaskList(5);
            //Get the data

            if (!string.IsNullOrWhiteSpace(filter))
                model = new TaskList(model.ItemsPerPage, model.Where(t => t.Description.ToLowerInvariant().Contains(filter.ToLowerInvariant())));

            if(model.NumberOfPages < currentPage)
                model.CurrentPage = 0; // Invalid Page Number
            else
                model.CurrentPage = currentPage;

            ViewBag.Filter = filter;
            return View(model);
        }

        [HttpPost]
        public IActionResult SaveTask(Models.Task task)
        {
            //save the task
            throw new NotImplementedException();
            //var jsonTask = JsonSerializer.Serialize(task);            


        }        

        [HttpPost]
        public IActionResult FilterTaskList(string filter)
        {
            return RedirectToAction(nameof(Index), new { filter });
        }

        public IActionResult ChangePage(int newPage, string filter = "")
        {
            return RedirectToAction(nameof(Index), new { currentPage = newPage, filter = filter });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
