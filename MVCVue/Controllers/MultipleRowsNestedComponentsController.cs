using System.Linq;
using System.Threading.Tasks;
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
        public async Task<IActionResult> Index(MultipleCarModel viewModel)
        {
            var cars = await Utils.GetCars();
            var submitted = new SubmittedBrandsAndModels
            {
                Brands = viewModel.CarModels?.Select(cm => cm.BrandId)
                    .Select(brandId => cars.FirstOrDefault(p => p.BrandId == brandId)?.BrandName),
                Models = viewModel.CarModels?.Select(cm => cm.ModelId)
                    .Select(modelId => cars.SelectMany(p => p.Models).SingleOrDefault(p => p.ModelId == modelId)?.ModelName)
            };

            return View("Submitted", submitted);
        }
    }
}
