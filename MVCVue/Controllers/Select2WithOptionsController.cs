using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;
using System.Linq;
using System.Threading.Tasks;

namespace MVCVue.Controllers
{
    public class Select2WithOptionsController : Controller
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
            var cars = await Utils.GetCars();
            var submitted = new SubmittedBrandsAndModels
            {
                Brands = viewModel.BrandIds?
                    .Select(brandId => cars.First(p => p.BrandId == brandId).BrandName),
                Models = viewModel.ModelIds?
                    .Select(modelId => cars.SelectMany(p => p.Models).First(p => p.ModelId == modelId).ModelName)
            };

            return View("Submitted", submitted);
        }
    }
}
