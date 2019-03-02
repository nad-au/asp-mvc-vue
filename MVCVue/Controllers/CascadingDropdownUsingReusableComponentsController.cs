using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class CascadingDropdownUsingReusableComponentsController : Controller
    {
        public IActionResult Index()
        {
            return View(new CarModel { BrandId = CarBrands.Kia, ModelId = CarModels.KiaSoul });
        }

        [HttpPost]
        public async Task<IActionResult> Index(CarModel viewModel)
        {
            var brandModels = await Utils.GetBrandModels();
            var submitted = new SubmittedBrandsAndModels
            {
                Brands = viewModel.BrandId > 0 ? new List<string>
                {
                    brandModels.First(p => p.BrandId == viewModel.BrandId).BrandName
                } : null,
                Models = viewModel.ModelId > 0 ? new List<string>
                {
                    brandModels.First(p => p.ModelId == viewModel.ModelId).ModelName
                } : null
            };

            return View("Submitted", submitted);
        }
    }
}
