using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class CascadingDropdownWithSelect2MultiSelectController : Controller
    {
        public IActionResult Index()
        {
            return View(new CarMultipleModel { BrandId = CarBrands.Kia, ModelIds = new []
            {
                CarModels.KiaRio,
                CarModels.KiaSoul
            }});
        }

        [HttpPost]
        public IActionResult Index(CarMultipleModel viewModel)
        {
            return RedirectToAction("Index");
        }
    }
}