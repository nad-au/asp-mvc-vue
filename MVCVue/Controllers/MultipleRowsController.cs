using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class MultipleRowsController : Controller
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
            var brandModels = await Utils.GetBrandModels();
            var submitted = new SubmittedBrandsAndModels
            {
                Brands = viewModel.CarModels?.Select(cm => cm.BrandId)
                    .Select(brandId => brandModels.FirstOrDefault(p => p.BrandId == brandId)?.BrandName),
                Models = viewModel.CarModels?.Select(cm => cm.ModelId)
                    .Select(modelId => brandModels.SingleOrDefault(p => p.ModelId == modelId)?.ModelName)
            };

            return View("Submitted", submitted);
        }
    }
}
