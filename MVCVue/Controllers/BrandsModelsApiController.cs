using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MVCVue.Models;
using ServiceStack;

namespace MVCVue.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandsModelsApiController : ControllerBase
    {
        // GET api/brands
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var brands = (await GetBrandModels())
                .GroupBy(g => g.BrandId)
                .Select(p => p.First().ConvertTo<Brand>())
                .OrderBy(o => o.BrandId);

            return Ok(brands);
        }

        // GET api/brands/1/models
        [HttpGet("{brandId}/models")]
        public async Task<ActionResult<string>> GetModels(long brandId)
        {
            var programs = (await GetBrandModels())
                .Where(p => p.BrandId == brandId)
                .Select(p => p.ConvertTo<Model>())
                .OrderBy(p => p.ModelId);

            return Ok(programs);
        }

        // GET api/brands/withModels
        [HttpGet("withModels")]
        public async Task<IActionResult> GetBrandsWithModels()
        {
            return Ok(await GetBrandModels());
        }

        private async Task<IEnumerable<BrandModel>> GetBrandModels()
        {
            var json = await Utils.GetResourceContent(Utils.BrandModels);
            return json.FromJson<List<BrandModel>>();
        }
    }
}
