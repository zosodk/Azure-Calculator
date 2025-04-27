using Microsoft.AspNetCore.Mvc;
using Microsoft.FeatureManagement;
using Shared.Data;
using Shared.Models;
using Shared.Services;
using Microsoft.EntityFrameworkCore;

namespace AdvancedCalculatorApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdvancedCalculatorController : ControllerBase
    {
        private readonly CalculatorService _calculatorService;
        private readonly CalculatorDbContext _context;
        private readonly IFeatureManager _featureManager;

        public AdvancedCalculatorController(CalculatorService calculatorService, CalculatorDbContext context, IFeatureManager featureManager)
        {
            _calculatorService = calculatorService;
            _context = context;
            _featureManager = featureManager;
        }

        [HttpPost]
        public async Task<IActionResult> Calculate([FromBody] CalculationRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Expression))
                return BadRequest("Expression is required");

            request.Result = _calculatorService.Evaluate(request.Expression);

            if (await _featureManager.IsEnabledAsync("SaveCalculationHistory"))
            {
                _context.Calculations.Add(request);
                await _context.SaveChangesAsync();
            }

            return Ok(new { result = request.Result });
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            if (!await _featureManager.IsEnabledAsync("SaveCalculationHistory"))
            {
                return Ok(new List<CalculationRequest>());
            }

            var history = await _context.Calculations
                .OrderByDescending(c => c.Timestamp)
                .Take(10)
                .ToListAsync();

            return Ok(history);
        }
    }
}
