using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class CascadingDropdownUsingComponentsController : Controller
    {
        public IActionResult Index()
        {
            return View(new CarModel { BrandId = CarBrands.Kia, ModelId = CarModels.KiaSoul });
        }

        [HttpPost]
        public IActionResult Index(CarModel viewModel)
        {
            return RedirectToAction("Index");
        }
    }
}