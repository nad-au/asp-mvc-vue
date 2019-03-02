using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<IActionResult> Index(CarBrandMultipleModel viewModel)
        {
            var brandModels = await Utils.GetBrandModels();
            var submitted = new SubmittedBrandsAndModels
            {
                Brands = viewModel.BrandIds?
                    .Select(brandId => brandModels.First(p => p.BrandId == brandId).BrandName),
                Models = viewModel.ModelIds?
                    .Select(modelId => brandModels.Single(p => p.ModelId == modelId).ModelName)
            };

            return View("Submitted", submitted);
        }
    }
}
