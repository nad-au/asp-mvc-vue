using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class SimpleDropdownUsingComponentsController : Controller
    {
        public IActionResult Index()
        {
            return View(new CarModel { BrandId = CarBrands.Kia});
        }

        [HttpPost]
        public IActionResult Index(CarModel viewModel)
        {
            return RedirectToAction("Index");
        }
    }
}