using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Linq;
using TimeTracker.Internal;
using TimeTracker.Models;

namespace TimeTracker.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private IDataBaseConnection<Task> _dataBaseConnection;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            _dataBaseConnection = new JsonDatabase<Task>() { PathToFile = AppDomain.CurrentDomain.BaseDirectory + "Database.json" };//Do this with IOC and DI            
        }

        public IActionResult Index(int currentPage = 0, string filter = "")
        {
            //Get the data. Todo: do this as an asynchronous call to let the site initialize before the data is loaded.
            var data = _dataBaseConnection.GetAll();
            var model = new TaskList(5, data);
            
            //Check for filter
            if (!string.IsNullOrWhiteSpace(filter))
                model = new TaskList(model.ItemsPerPage, model.Where(t => t.Description.ToLowerInvariant().Contains(filter.ToLowerInvariant())));

            //Check currentpage in numberofpages
            if(model.NumberOfPages < currentPage)
                model.CurrentPage = 0; // Invalid Page Number
            else
                model.CurrentPage = currentPage;

            //Set data and show view
            ViewBag.Filter = filter;
            return View(model);
        }

        [HttpPost]
        public IActionResult SaveTask(Task task)
        {
            //save the task
            task.Duration = task.Duration * 10; // One hour in JS is 3.600.000 ticks. One hour in C# is 36.000.000? What?
            var result = _dataBaseConnection.Save(task);

            if (result)
                return RedirectToAction(nameof(Index));

            //Todo: Should be an error message thats given to the user and no exception.
            throw new InvalidOperationException("Speichern des Tasks fehlgeschlagen");
        }        

        [HttpPost]
        public IActionResult FilterTaskList(string filter)
        {
            //Todo: Should be a client side action not server or async ajax.
            return RedirectToAction(nameof(Index), new { filter });
        }

        public IActionResult ChangePage(int newPage, string filter = "")
        {
            //Todo: Should be a client side action not server or async ajax.
            return RedirectToAction(nameof(Index), new { currentPage = newPage, filter = filter });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
