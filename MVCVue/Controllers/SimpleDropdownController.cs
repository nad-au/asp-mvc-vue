using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class SimpleDropdownController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(CarModel viewModel)
        {
            return RedirectToAction("Index");
        }
    }
}