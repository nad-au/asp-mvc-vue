using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MVCVue.Controllers
{
    [Route("api/cars")]
    [ApiController]
    public class CarsApiController : ControllerBase
    {
        // GET api/cars
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var cars = await Utils.GetCars();

            return Ok(cars);
        }

        // GET api/cars/1
        [HttpGet("{brandId}")]
        public async Task<IActionResult> Get(long brandId)
        {
            var car = (await Utils.GetCars())
                .SingleOrDefault(p => p.BrandId == brandId);

            return Ok(car);
        }

        // GET api/cars/1/models
        [HttpGet("{brandId}/models")]
        public async Task<ActionResult> GetModels(long brandId)
        {
            var models = (await Utils.GetCars())
                .SingleOrDefault(p => p.BrandId == brandId)
                ?.Models;

            return Ok(models);
        }
    }
}
