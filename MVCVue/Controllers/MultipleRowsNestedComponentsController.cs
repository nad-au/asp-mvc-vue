using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class MultipleRowsNestedComponentsController : Controller
    {
        public IActionResult Index()
        {
            return View(new MultipleCarModel
            {
                CarModels = new []
                {
                    new CarModel { BrandId = CarBrands.Kia, ModelId = CarModels.KiaSoul },
                    new CarModel { BrandId = CarBrands.BMW, ModelId = CarModels.BMW5Series }
                }
            });
        }

        [HttpPost]
        public IActionResult Index(MultipleCarModel viewModel)
        {
            return RedirectToAction("Index");
        }
    }
}
