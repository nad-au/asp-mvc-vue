using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class CascadingDropdownWithSelect2MultiSelectManagedController : Controller
    {
        public IActionResult Index()
        {
            return View(new CarBrandMultipleModel { 
                BrandIds = new [] {
                    CarBrands.BMW,
                    CarBrands.Kia
                },
                ModelIds = new [] {
                    CarModels.BMW5Series,
                    CarModels.KiaRio,
                    CarModels.KiaSoul
                }});
        }

        [HttpPost]
        public IActionResult Index(CarBrandMultipleModel viewModel)
        {
            return RedirectToAction("Index");
        }
    }
}