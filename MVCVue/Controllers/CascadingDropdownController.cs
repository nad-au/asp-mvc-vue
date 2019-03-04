using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;

namespace MVCVue.Controllers
{
    public class CascadingDropdownController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Index(CarModel viewModel)
        {
            var cars = await Utils.GetCars();
            var submitted = new SubmittedBrandsAndModels
            {
                Brands = viewModel.BrandId > 0 ? new List<string>
                {
                    cars.First(p => p.BrandId == viewModel.BrandId).BrandName
                } : null,
                Models = viewModel.ModelId > 0 ? new List<string>
                {
                    cars.SelectMany(p => p.Models).First(p => p.ModelId == viewModel.ModelId).ModelName
                } : null
            };

            return View("Submitted", submitted);
        }
    }
}
