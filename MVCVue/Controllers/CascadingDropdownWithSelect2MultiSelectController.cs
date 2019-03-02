using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<IActionResult> Index(CarMultipleModel viewModel)
        {
            var brandModels = await Utils.GetBrandModels();
            var submitted = new SubmittedBrandsAndModels
            {
                Brands = viewModel.BrandId > 0 ? new List<string>
                {
                    brandModels.First(p => p.BrandId == viewModel.BrandId).BrandName
                } : null,
                Models = viewModel.ModelIds?
                    .Select(modelId => brandModels.Single(p => p.ModelId == modelId).ModelName)
            };

            return View("Submitted", submitted);
        }
    }
}
